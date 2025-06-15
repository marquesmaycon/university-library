import { HexColorInput, HexColorPicker } from "react-colorful"

type ColorPickerProps = {
  value?: string
  onChange?: (color: string) => void
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput color={value} onChange={onChange} className="hex-input" />
      </div>
      <div className="color-picker">
        <HexColorPicker color={value} onChange={onChange} />
      </div>
    </div>
  )
}

export default ColorPicker
