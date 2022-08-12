import Switch, { ReactSwitchProps } from 'react-switch'

type TemperatureSwitchProps = ReactSwitchProps

export function TemperatureSwitch({
  checked,
  onChange,
  ...rest
}: TemperatureSwitchProps) {
  return (
    <Switch
      height={30}
      width={50}
      handleDiameter={20}
      checkedIcon={false}
      uncheckedIcon={false}
      onHandleColor='#D9D9D9'
      onColor='#D2B3C1'
      offHandleColor='#D9D9D9'
      offColor='#2C5D79'
      checked={checked}
      onChange={onChange}
      {...rest}
    />
  )
}