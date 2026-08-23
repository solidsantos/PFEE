import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const registrationsPath = path.join(
  __dirname,
  '../data/registrations.json'
);

const eventsPath = path.join(
  __dirname,
  '../data/events.json'
);

async function readRegistrations() {
  const data = await fs.readFile(
    registrationsPath,
    'utf-8'
  );

  return JSON.parse(data);
}

async function saveRegistrations(registrations) {
  await fs.writeFile(
    registrationsPath,
    JSON.stringify(registrations, null, 2)
  );
}

async function readEvents() {
  const data = await fs.readFile(
    eventsPath,
    'utf-8'
  );

  return JSON.parse(data);
}

export async function registerEvent(req, res) {
  try {
    const userId = req.user.id;
    const eventId = Number(req.params.id);

    const events = await readEvents();
    const registrations = await readRegistrations();

    const event = events.find(
      (event) => event.id === eventId
    );

    if (!event) {
      return res.status(404).json({
        message: 'Evento não encontrado.'
      });
    }

    const alreadyRegistered = registrations.some(
      (registration) =>
        registration.userId === userId &&
        registration.eventId === eventId
    );

    if (alreadyRegistered) {
      return res.status(409).json({
        message: 'Você já está inscrito neste evento.'
      });
    }

    const eventRegistrations = registrations.filter(
      (registration) =>
        registration.eventId === eventId
    );

    if (eventRegistrations.length >= event.capacity) {
      return res.status(409).json({
        message: 'As vagas para este evento estão esgotadas.'
      });
    }

    const newRegistration = {
      id:
        registrations.length > 0
          ? Math.max(
              ...registrations.map(
                (registration) => registration.id
              )
            ) + 1
          : 1,
      userId,
      eventId,
      registeredAt: new Date().toISOString()
    };

    registrations.push(newRegistration);

    await saveRegistrations(registrations);

    return res.status(201).json({
      message: 'Inscrição realizada com sucesso.',
      registration: newRegistration
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao realizar inscrição.'
    });
  }
}

export async function getMyEvents(req, res) {
  try {
    const userId = req.user.id;

    const registrations = await readRegistrations();
    const events = await readEvents();

    const myRegistrations = registrations.filter(
      (registration) =>
        registration.userId === userId
    );

    const myEvents = myRegistrations
      .map((registration) => {
        const event = events.find(
          (event) =>
            event.id === registration.eventId
        );

        if (!event) {
          return null;
        }

        return {
          ...event,
          registrationId: registration.id,
          registeredAt: registration.registeredAt
        };
      })
      .filter(Boolean);

    return res.status(200).json(myEvents);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao buscar seus eventos.'
    });
  }
}

export async function cancelRegistration(req, res) {
  try {
    const userId = req.user.id;
    const eventId = Number(req.params.id);

    const registrations = await readRegistrations();

    const index = registrations.findIndex(
      (registration) =>
        registration.userId === userId &&
        registration.eventId === eventId
    );

    if (index === -1) {
      return res.status(404).json({
        message: 'Você não está inscrito neste evento.'
      });
    }

    const cancelledRegistration =
      registrations[index];

    registrations.splice(index, 1);

    await saveRegistrations(registrations);

    return res.status(200).json({
      message: 'Inscrição cancelada com sucesso.',
      registration: cancelledRegistration
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: 'Erro ao cancelar inscrição.'
    });
  }
}