import TodoItem from '../todoitem';
import { Todo } from '@/features/todo/slice';


const TodoList = ({ todos }: { todos: Todo[] }) => {
    return (
        <div className="bg-gray-100 p-4 min-h-screen">
            <div className="max-w-2xl mx-auto space-y-2">
                <h1 className="text-2xl font-bold mb-4">Danh sách công việc</h1>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            completed={todo.completed}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 italic">Chưa có công việc nào</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;