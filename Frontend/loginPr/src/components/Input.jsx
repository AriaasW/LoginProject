import React from "react";

export default function InputForm({ label, value, type='text', onChange}) {
    return (
        <div className="inpt">
            <span>{label}</span>
            <input type={type} value={value} onChange={onChange}></input>
        </div>
    )
}