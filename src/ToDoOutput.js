import React from 'react'

export function ToDoOutput({ text, count }) {
    console.log(text[0].title);
    const texts = [];
    for(let i=0 ; i<text.length; i++){
        texts.push(text[i].title)
    }
    return <div>{texts}</div>
}