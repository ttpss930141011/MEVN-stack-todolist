<template lang="html">
    
    <h1 class="text-2xl text-red-700">Todolist</h1>
    <div class="my-5">
        <form @submit="addTodo($event)">
            <input type="text" placeholder="Enter todo..." v-model="newTodo">
            <input type="submit">
        </form>
    </div>
    <div class="my-5">
        <table class="table-fixed mx-auto">
            <thead class="bg-sky-300 border-collapse border border-slate-500">
                <tr>
                    <th class="border border-slate-600">No</th>
                    <th class="border border-slate-600">item</th>
                    <th class="border border-slate-600">method</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(todo,index) in todos" :key="todo._id">
                    <td class="border border-slate-700 p-5">
                        {{index + 1}}
                        <!-- <input type="checkbox" @click="deleteTodo(todo._id)"> -->
                    </td>
                    <td class="border border-slate-700 p-5">
                        
                        <input type="text" v-model="editingText" v-if="editingRow===index">
                        <span v-else>{{todo.title}}</span>
                    </td>
                    <td class="border border-slate-700 p-5">
                        <div class="flex" v-if="editingRow===index">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 cursor-pointer" @click="updateTodo(todo._id)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 cursor-pointer" @click="cancelModify()" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <div class="flex" v-else>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 cursor-pointer" @click="toggleModifyMode(index)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2 cursor-pointer" @click="deleteTodo(todo._id)" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import ToDoAPI from '@/services/ToDoAPI';

export default {
    data (){
        return{
            newTodo : "",
            todos : [],
            editingText : "",
            editingRow : -1
        }
    },
    mounted (){
        this.loadTodos()
    },
    methods:{
        async loadTodos (){
            const response = await ToDoAPI.getToDos();
            this.todos = response.data;
        },
        async addTodo(event){
            event.preventDefault();
            const response = await ToDoAPI.addTodo(this.newTodo);
            this.todos.push(response.data);
            this.newTodo = '';
        },
        async deleteTodo(id){
            if (confirm('Comfirm to delete?')) {
                const response = await ToDoAPI.deleteTodo(id);
                this.todos = response.data;
            }
        },
        async updateTodo(id){
            const response = await ToDoAPI.updateTodo(id,this.editingText);
            this.todos = response.data;
            this.editingRow = -1;
            this.editingText = "";
        }
        ,
        toggleModifyMode(index){
            this.editingText = this.todos[index]['title'];
            this.editingRow = index;
        },
        cancelModify(){
            this.editingText = "";
            this.editingRow = -1
        }
    }
}
</script>
<style lang="css">
</style>