import { SignupInput } from "@aaravrawat/medium-common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {  

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })

    return <div className="h-screen flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col">
            <h3 className="text-3xl font-extrabold">Create an Account</h3>
            <span className="text-slate-400">{
                type === "signup" ? "Already have an account?" : "Create an account"
            } <Link to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Login" : "Sign up"}
                 </Link></span>
        </div>

{
  type === "signup"?
        <LabelledInput label={"Name"} placeholder={"Enter Name..."}

            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }} />
            : null
}

        <LabelledInput label={"Email"} placeholder={"Enter Email..."}

            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }} />

        <LabelledInput label={"password"} placeholder={"Enter password..."}
            type={"password"}
            onChange={(e) => {
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }} />

        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-3">{type === "signup" ? "Sign up" : "Sign in"}</button>


    </div>
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>

        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />

    </div>
}