import React from "react";

function Card({ title, description, episodeNumber, timeLength, guests }) {
    if (!Array.isArray(guests)) {
        guests = [];
    }
    return (
<article class="rounded-xl bg-white p-4 ring ring-indigo-50 p-6 lg:p-8 text-gray-700">
    <div class="flex items-start gap-8">
            <div
            class=" grid size-20 shrink-0 place-content-center rounded-full border-2 border-indigo-500"
            aria-hidden="true"
            >
      <div class="flex items-center gap-1">
                        <span className=" h-8 w-0.5 rounded-full bg-indigo-500"></span>
                        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                        <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                        <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                        <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                    </div>
        </div>

                <div>
                    <strong
                        className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                    >
                        Encuesta #{episodeNumber}
                    </strong>

                    <h3 className="mt-4 text-lg font-medium sm:text-xl">
                        <a href="#" className="hover:underline">{title}</a>
                    </h3>

                    <p className="mt-1 text-sm text-gray-700">
                        {description}
                    </p>

                    <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>

                            <p className="text-xs font-medium">{timeLength} minutes</p>
                        </div>

                        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                        <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0">
                            Featuring {guests.map(guest => (
                                <a key={guest} href="#" className="underline hover:text-gray-700">{guest}</a>
                            ))}
                        </p>
                    </div>
                </div>
    </div>
</article>
    );
}

export default Card;
