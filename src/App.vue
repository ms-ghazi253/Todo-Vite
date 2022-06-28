<template>
  <section class="vh-100" style="background-color: #eee;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-lg-9 col-xl-7">
        <div class="card rounded-3">
          <div class="card-body p-4">
            <h4 class="text-center my-3 pb-3">To Do App</h4>
           	<Formtodo @add-todo="dataHandler" :Position="Statuses" ></Formtodo>
			<Tabletodo @delete-task="deleteTask" :items="tasks" @edit-todo="editTodo($event)"></Tabletodo>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script >
import Formtodo from './components/Form-todo.vue'
import Tabletodo from './components/Table-todo.vue'
export default{
	components:{
		Formtodo,
		Tabletodo
	}, 
	data() {
		return{
			task:"",
			EditedTask:null,
			StatusEmpty:'',
			Statuses:['stopped' , 'inprogress' , 'finished'],
			tasks:[]
		}
	},
	provide(){
		//وقتی بخواهیم از یک پروواید استاتیک استفاده بکنیم آن را به حالت ابجت استفاده میکنیم اما اگر بخواهیم داینامیک باشه انرا مثل متد استفاده میکنیم 
		return{
			tasks:[{
				TodoItem: 'go to gym ',
				Action: ['Delete' , 'Edit'],
				key: Date.now() , 
				done: false,
			}]
		}
	},
	methods:{
		dataHandler(text, status) {
				this.tasks.push({
				TodoItem: text,
				Status: status,
				Action: ['Delete' , 'Edit'],
				key: Date.now() , 
				done: false,
				editMode: false,
			});

		}, 
		deleteTask(key){
			this.tasks = this.tasks.filter(item=>item.key!=key)
		},
		editTodo({key ,text, editMode}){
			this.tasks = this.tasks.map(item=>{
				if(item.key==key){
					return{
						...item,
						editMode: editMode,
						TodoItem: text
					}
				}
				return item;
			})
	}
	}
}
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
