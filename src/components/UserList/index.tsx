import { useEffect, useRef, useState } from 'react'
import { User } from '../../interfaces/User'
import { FiSearch, FiUsers } from 'react-icons/fi'

const UserList = () => {
const [users, setUsers] = useState<User[]>([])
const [searchTerm, setSearchTerm] = useState<string>('')
const [usersToAppear, setUsersToAppear] = useState<number>(5)
const selectRef = useRef<HTMLSelectElement>(null)
const inputRef = useRef<HTMLInputElement>(null)

const optionGroup = [
    { value: 'name', label: 'Name' },
    { value: 'city', label: 'City' },
] 


  useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(data => setUsers(data))
  }, [])

  const handleFilter = (): User[] => {
    let filteredResult: User[] = []
    const filterCategory = selectRef.current?.value

    if(filterCategory == 'name'){
        filteredResult = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    
    if(filterCategory == 'city'){
        filteredResult = users.filter(user => user.address.city.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return filteredResult
  }


  const filteredUsers: User[] = handleFilter()

  const cleanFilter = (): void => {
    inputRef.current!.value = '';
    setSearchTerm('')
  }
  
  return (
    <section className="container xl:w-10/12 2xl:w-8/12 m-auto mt-14 mb-6 flex flex-col gap-12">
        <h1 className=" text-2xl lg:text-4xl w-full text-slate-800 underline underline-offset-4 flex items-center justify-center gap-4">User list <FiUsers /></h1>
        <div className="w-4/5 md:w-3/5 m-auto border border-solid border-gray-400 rounded flex items-center pr-2">
            <select 
                ref={selectRef}
                onChange={() => cleanFilter()}
                className="
                    form-select
                    block
                    w-auto
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
                    {optionGroup.map(option => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                    ))}
            </select>
            <input
                type="text"
                ref={inputRef}
                className="
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                    border-l border-gray-400
                "
                id="searchTerm"
                placeholder="Name, City..."
                onChange={event => setSearchTerm(event.target.value)}
            />
            <FiSearch size="24" color="#737881"/>
        </div>
            {
                searchTerm.length > 0 ? (
                    <ul className="flex flex-col m-auto w-full px-4 gap-4">
                        {filteredUsers.map(user => (
                            <li className="flex gap-4 py-2 w-full border-b border-slate-900 flex-col md:flex-row" key={user.id}>
                                <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">Name:</strong> {user.name}</p>
                                <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">E-mail:</strong> {user.email}</p>
                                <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">City:</strong> {user.address.city}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <>
                        <ul className="flex flex-col m-auto w-full px-4 gap-4">
                            {users.sort().slice(0, usersToAppear).map(user => (
                                <li className="flex gap-4 py-2 px-2 w-full border border-slate-900 flex-col md:flex-row" key={user.id}>
                                    <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">Name:</strong> {user.name}</p>
                                    <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">E-mail:</strong> {user.email}</p>
                                    <p className="w-full md:w-1/3"><strong className="font-semibold text-slate-800">City:</strong> {user.address.city}</p>
                                </li>
                            ))}
                        </ul>
                        {usersToAppear < users.length && (
                            <button 
                                type='button' 
                                onClick={() => setUsersToAppear(state => state + 5)} 
                                className="
                                    px-3 py-1 
                                    border border-slate-900 
                                    rounded 
                                    w-fit 
                                    self-end 
                                    hover:bg-slate-700 hover:text-white 
                                    transition-all delay-25 
                                    mt-4
                                    mr-4"
                            >
                                Show More
                            </button>)} 
                    </>
                )
            }
    </section>
  )
}

export default UserList