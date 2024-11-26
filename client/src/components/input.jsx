export default function Input({ placeholder, handleInput, name }) {
  return (
    <div>
      <input
        name={name}
        className="input-field"
        onChange={handleInput}
        type="text"
        placeholder={placeholder}
      />
    </div>
  )
}
