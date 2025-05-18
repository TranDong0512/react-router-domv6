import { Todo } from '@/features/todo/slice';

const TodoItem = ({ id, title, completed }: Todo) => {
    return (
        <div
            className={`flex items-center p-3 border rounded-lg ${completed ? 'bg-green-100 line-through' : 'bg-white'
                }`}
        >
            <span className="w-12 font-bold">{id}</span>
            <span className="flex-1 mx-3">{title}</span>
            <input
                type="checkbox"
                className="h-5 w-5"
                checked={completed}
                readOnly
            />
        </div>
    );
};

export default TodoItem;