export default function SubMenu({ items }) {
  return (
    <ul className="sub_menu">
      {items.map((item, idx) => <li key={idx}>{item}</li>)}
    </ul>
  );
}