import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventsPath = path.join(
    __dirname,
    '../data/events.json'
);

const registrationsPath = path.join(
    __dirname,
    '../data/registrations.json'
);

async function readEvents() {
    const data = await fs.readFile(
        eventsPath,
        'utf-8'
    );

    return JSON.parse(data);
}

async function saveEvents(events) {
    await fs.writeFile(
        eventsPath,
        JSON.stringify(events, null, 2)
    );
}

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

export async function getEvents(req, res) {
    try {
        let events = await readEvents();

        const {
            search,
            category,
            date,
            location
        } = req.query;

        if (search) {
            const searchTerm = search.toLowerCase();

            events = events.filter(
                (event) =>
                    event.title
                        .toLowerCase()
                        .includes(searchTerm) ||
                    event.description
                        .toLowerCase()
                        .includes(searchTerm)
            );
        }

        if (category) {
            events = events.filter(
                (event) =>
                    event.category.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        if (date) {
            events = events.filter(
                (event) => event.date === date
            );
        }

        if (location) {
            events = events.filter(
                (event) =>
                    event.location
                        .toLowerCase()
                        .includes(location.toLowerCase())
            );
        }

        return res.status(200).json(events);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao buscar eventos.'
        });
    }
}

export async function getEventById(req, res) {
    try {
        const events = await readEvents();

        const event = events.find(
            (event) =>
                event.id === Number(req.params.id)
        );

        if (!event) {
            return res.status(404).json({
                message: 'Evento não encontrado.'
            });
        }

        return res.status(200).json(event);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao buscar evento.'
        });
    }
}

export async function createEvent(req, res) {
    try {
        const {
            title,
            description,
            date,
            time,
            location,
            category,
            organizer,
            capacity
        } = req.body;

        if (
            !title ||
            !description ||
            !date ||
            !time ||
            !location ||
            !category ||
            !organizer ||
            capacity === undefined ||
            capacity === null ||
            capacity === ''
        ) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios.'
            });
        }

        const eventCapacity = Number(capacity);

        if (
            !Number.isInteger(eventCapacity) ||
            eventCapacity <= 0
        ) {
            return res.status(400).json({
                message:
                    'A capacidade deve ser um número inteiro maior que zero.'
            });
        }

        const events = await readEvents();

        const newEvent = {
            id:
                events.length > 0
                    ? Math.max(
                        ...events.map((event) => event.id)
                    ) + 1
                    : 1,

            title,
            description,
            date,
            time,
            location,
            category,
            organizer,
            capacity: eventCapacity
        };

        events.push(newEvent);

        await saveEvents(events);

        return res.status(201).json({
            message: 'Evento criado com sucesso.',
            event: newEvent
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao criar evento.'
        });
    }
}

export async function updateEvent(req, res) {
    try {
        const events = await readEvents();

        const index = events.findIndex(
            (event) =>
                event.id === Number(req.params.id)
        );

        if (index === -1) {
            return res.status(404).json({
                message: 'Evento não encontrado.'
            });
        }

        const {
            title,
            description,
            date,
            time,
            location,
            category,
            organizer,
            capacity
        } = req.body;

        if (
            !title ||
            !description ||
            !date ||
            !time ||
            !location ||
            !category ||
            !organizer ||
            capacity === undefined ||
            capacity === null ||
            capacity === ''
        ) {
            return res.status(400).json({
                message: 'Todos os campos são obrigatórios.'
            });
        }

        const eventCapacity = Number(capacity);

        if (
            !Number.isInteger(eventCapacity) ||
            eventCapacity <= 0
        ) {
            return res.status(400).json({
                message:
                    'A capacidade deve ser um número inteiro maior que zero.'
            });
        }

        events[index] = {
            ...events[index],

            title,
            description,
            date,
            time,
            location,
            category,
            organizer,
            capacity: eventCapacity
        };

        await saveEvents(events);

        return res.status(200).json({
            message: 'Evento atualizado com sucesso.',
            event: events[index]
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao atualizar evento.'
        });
    }
}

export async function deleteEvent(req, res) {
    try {
        const events = await readEvents();

        const eventId = Number(req.params.id);

        const index = events.findIndex(
            (event) => event.id === eventId
        );

        if (index === -1) {
            return res.status(404).json({
                message: 'Evento não encontrado.'
            });
        }

        const deletedEvent = events[index];

        events.splice(index, 1);

        await saveEvents(events);

        const registrations =
            await readRegistrations();

        const updatedRegistrations =
            registrations.filter(
                (registration) =>
                    registration.eventId !== eventId
            );

        await saveRegistrations(
            updatedRegistrations
        );

        return res.status(200).json({
            message: 'Evento excluído com sucesso.',
            event: deletedEvent
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Erro ao excluir evento.'
        });
    }
}