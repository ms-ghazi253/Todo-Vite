<template>
	 <form class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" @submit.prevent="savedata">
              <div class="col-10">
                <div class="form-outline">
                  <input type="text" v-model="todoText" class="form-control"  />
                  <label class="form-label" >Enter a task here</label>
                </div>
              </div>
				<select class="col-2 " v-model="todoselect">
					<option  v-for="(status , index) in Position" :key="index">{{status}}</option>
				</select>
              <div class="col-12">
                <button type="submit"  class="btn btn-primary">Save</button>
              </div>

              
            </form>
</template>
<script>
 
export default{
	
	emits:{
	'add-todo':{
			type:Array,
			required:true,
			validator:function(value){
				return value.length>1
	}
	}
	},
	props:{
		Position:{
			type:Array,
			required:true,
			validator:function(value){
				return value.length>1
			}
		}
	},
	data(){
		return{
			todoText:'',
			todoselect:this.Position[0]
		}
	} , 
	methods:{
		savedata(){
			this.$emit('add-todo' , this.todoText , this.todoselect) ;
			this.todoText= '';
			this.todoselect='stopped';
			
		}
	}
}
</script>