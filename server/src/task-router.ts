import express from 'express';
import taskService from './task-service';

/**
 * Express router containing task methods.
 */
const router = express.Router();

router.get('/tasks', (_request, response) => {
  taskService
    .getAll()
    .then((rows) => response.send(rows))
    .catch((error) => response.status(500).send(error));
});

router.get('/tasks/:id', (request, response) => {
  const id = Number(request.params.id);
  taskService
    .get(id)
    .then((task) => (task ? response.send(task) : response.status(404).send('Task not found')))
    .catch((error) => response.status(500).send(error));
});

// Example request body: { title: "Ny oppgave" }
// Example response body: { id: 4 }
router.post('/tasks', (request, response) => {
  const data = request.body;
  if (data && data.title.length != 0)
    taskService
      .create(data.title)
      .then((id) => response.send({ id: id }))
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task title');
});

// Example request body: { id: 4, title: "Ny oppgave", done: true }
router.put('/tasks', (request, response) => {
  const data = request.body;
  if (
    typeof data.id == 'number' &&
    typeof data.title == 'string' &&
    data.title.length != 0 &&
    typeof data.done == 'boolean'
  )
    taskService
      .update({ id: data.id, title: data.title, done: data.done })
      .then(() => response.send())
      .catch((error) => response.status(500).send(error));
  else response.status(400).send('Missing task properties');
});

router.delete('/tasks/:id', (request, response) => {
  taskService
    .delete(Number(request.params.id))
    .then((_result) => response.send())
    .catch((error) => response.status(500).send(error));
});

export default router;
