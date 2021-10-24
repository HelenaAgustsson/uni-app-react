import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v2';

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Task>('/tasks/' + id).then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get<Task[]>('/tasks').then((response) => response.data);
  }

  /**
   * Create new task having the given title.
   *
   * Resolves the newly created task id.
   */
  create(title: string) {
    return axios
      .post<{ id: number }>('/tasks', { title: title })
      .then((response) => response.data.id);
  }
  /**
   * Update given task.
   */
  update(task: Task) {
    return axios.put('/tasks', task).then((response) => response.data);
  }

  /**
   * Delete task having the given id.
   *
   * Resolves the newly created task id.
   */
  delete(id: number) {
    return axios.delete<Task>('/tasks/' + id).then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
