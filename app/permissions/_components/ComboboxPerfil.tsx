"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import api from "@/lib/api"

export default function ComboboxPerfil(
  {objeto, setObjet}: {objeto:any, setObjet: Function}) {
  const [searchTerm, setSearchTerm] = useState(
    objeto.name ?? ""
  )
  const [selectedOption, setSelectedOption] = useState(null)
  const [hasFocus, setHasFocus] = useState(false)
  const [options, setOptions] = useState([])

  useEffect(() => {

    getModel();

    async function getModel() {
      await api.get(`/permissoes/role/find/?name=`+searchTerm)
        .then(response => {
          console.log(response.data.roles)
          setOptions(response.data.roles)
        })
        .catch(error => {
          console.error("There was an error fetching the options!", error)
        })
    }
  }, [searchTerm, objeto])

  const filteredOptions = useMemo(() => {
    return options.filter((option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, options])
  function handleInputChange(e:any) {
    setSearchTerm(e.target.value)
    setSelectedOption(null)
  }
  function handleOptionSelect(option:any) {
    setSelectedOption(option)
    setSearchTerm(option.name)
    objeto.id = option.id
    objeto.name = option.name 
    setObjet(option)
    setHasFocus(false)
  }

  function handleFocus() {
    setHasFocus(true)
  }
  function handleBlur (){
    setTimeout(() => {
      setHasFocus(false)
    }, 100) // Small timeout to allow click event on option before hiding
  }
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full rounded-md border border-input bg-background px-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      />
      {hasFocus && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-card bg-card shadow-lg">
          <ul className="py-1">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`cursor-pointer px-4 py-2 text-foreground hover:bg-primary hover:text-primary-foreground ${
                  selectedOption?.id === option.id ? "bg-primary text-primary-foreground" : ""
                }`}
                onMouseDown={() => handleOptionSelect(option)}
              >
                {option.id} - {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}