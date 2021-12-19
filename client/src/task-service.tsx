import axios from 'axios';

axios.defaults.baseURL = 'https://helenaagustsson.github.io/uni-data/data';

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

export type Student = {
  id: number;
  name: string;
  uni_id: number;
};

class TaskService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Task>('/students.json').then((response) => response.data);
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return axios.get('/students.json').then((response) => response.data);
  }
}

const taskService = new TaskService();
export default taskService;
