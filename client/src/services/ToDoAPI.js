import API from '@/services/API'
export default {
    getToDos(){
        return API().get('todo')
    },
    addTodo(todo){
        return API().post('todo', {
          todo: todo // add our data to the request body
        })
    },
    deleteTodo(id){
        return API().delete('todo',{
            data:{id:id}
        })
    },
    updateTodo(id,text){
        return API().put('todo',{
            id:id,
            text:text
        })
    }
}