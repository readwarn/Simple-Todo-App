const TodoCategory = ({
  type,
  color = "bg-red-400",
  selected = false,
  onSelectCategory,
  id,
}) => (
  <div
    onClick={() => onSelectCategory(id)}
    className={`flex items-center gap-x-2 py-2 px-4 rounded-lg border border-gray-400 transition-colors cursor-pointer ${
      selected ? "bg-slate-100" : "bg-transparent"
    }`}
  >
    <div className={`w-[22px] h-[22px] rounded-full ${color}`}></div>
    <div className="text-sm text-brand-black">{type}</div>
    <div></div>
  </div>
);

export default TodoCategory;
