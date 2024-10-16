import React from "react";

export default function HomePage() {
    return (
        <section className="w-full h-screen flex flex-col justify-center">
            <h1>Hey, There! </h1>
            <div>
                <h2 className="inline">I am Anoop Kini, Software Developer @ </h2>
                <a target="_blank" href="https://www.ericsson.com/en"><h2 className="inline">Ericsson.</h2></a>
                <p><a href="mailto:anoopk.kini@gmail.com" data-before=' 📩' className="no-underline hover:underline after:content-[attr(data-before)] mt-2 " >Drop me a note</a></p>
            </div>
        </section>
    );
}