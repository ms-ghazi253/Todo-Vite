<template>
	    <table class="table mb-4 ">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Todo item</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
				<template v-for="(it , index) in items " :key="it.key" >
					<tr v-if="it.editMode===false">
						<th scope="row">{{index + 1}}</th>
						<td>{{it.TodoItem}}</td>
						<td>{{it.Status}}</td>
						<td>
							<button @click="$emit('deleteTask' ,it.key)" type="submit" class="btn btn-danger">{{it.Action[0]}}</button>
							<button @click="enableEdit(it)" type="submit" class="btn btn-success ms-1" >{{it.Action[1]}}</button>
						</td>
					</tr> 
					<tr v-if="it.editMode===true">
                  		<th scope="row">{{index + 1}}</th>
							<td><input type="text" v-model="todoText"></td>
							<td>{{it.Status}}</td>
							<td>
							<button type="submit" class="btn btn-success ms-1" @click="editTodo(it)">{{it.Action[1]}}</button>
						</td>
					</tr>
				</template>

				 
              </tbody>
            </table>
</template>
<script>
export default{
	props:{
		items:{
			type:Array,
			key:Number,
			required:true,
			validator:function(value){
				return value.length>1
			} , 

		//test: String
			
		}
	} , 
	emits:[ 'deleteTask' ,'edit-todo'],
	data(){
		return{
			editMode:false,
			todoText:'efs'
		}
	},
	methods:{
		enableEdit(it){
			this.items.map(el => {
				el.editMode = false
				if(el.key === it.key){
					el.editMode = true
				}
				return el;
			})
			this.todoText = it.TodoItem;
		} , 
		editTodo(it){
			this.$emit('edit-todo',{ key: it.key , text: this.todoText, editMode: false})
			this.todoText = '';
		}
	}
}
</script>