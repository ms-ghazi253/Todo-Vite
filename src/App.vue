<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card rounded-3">
            <div class="card-body p-4">
              <h4 class="text-center my-3 pb-3">To Do App</h4>
              <Formtodo @add-todo="dataHandler" :Position="Statuses"></Formtodo>
              <Tabletodo
                @delete-task="deleteTask"
                :items="tasks"
                @edit-todo="editTodo($event)"
              ></Tabletodo>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script >
import Formtodo from "./components/Form-todo.vue";
import Tabletodo from "./components/Table-todo.vue";
import TasksApi from './Api/TasksApi'
export default {
  components: {
    Formtodo,
    Tabletodo,
  },
  data() {
    return {
      task: "",
      EditedTask: null,
      StatusEmpty: "",
      Statuses: ["stopped", "inprogress", "finished"],
      tasks: [],
    };
  },
  created() {
    TasksApi
      .get(
        "/tasks.json"
      )
      .then(({ data }) => {
        let tasks = Object.entries(data).map((val) => {
          return {
            key: val[0],
            ...val[1],
          };
        });
        this.tasks = tasks;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    dataHandler(text, status) {
      let todo = {
        done: false,
        Status: status,
        TodoItem: text,
        Action: ["Delete", "Edit"],
      };
      TasksApi
        .post(
          "/tasks.json",
          todo
        )
        .then((res) => {
          this.tasks.push({
            ...todo,
            key: res.data.name,
            editMode: false,
          });
        })
        .catch((err) => console.log(err));
    },
    deleteTask(key) {
      console.log(key);
      TasksApi
        .delete(
          `/tasks/${key}.json`
        )
        .then((res) => {
          this.tasks = this.tasks.filter((item) => item.key != key);
          console.log(res);
        })
        .catch((err) => console.log(err));
    },
    editTodo({ key, text, editMode }) {
      TasksApi
        .patch(
          `/tasks/${key}.json`,
          { text }
        )
        .then((res) => {
          console.log(res);
          this.tasks = this.tasks.map((item) => {
            if (item.key == key) {
              return {
                ...item,
                editMode: editMode,
                TodoItem: text,
              };
            }
            return item;
          });
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
