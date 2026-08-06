type Props = {
    onClick: () => void;
};

function NewTaskButton({ onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="h-fit rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700"
        >
            New Task
        </button>
    );
}

export default NewTaskButton;