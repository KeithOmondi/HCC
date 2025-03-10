

const CEOMessage = () => {
    return (
        <section className="relative py-16 text-center">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1564013799919-ab600027ffc6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8fDA%3D)`,
                }}
            ></div>
            <div className="relative z-10 max-w-3xl mx-auto px-6 py-8 bg-white bg-opacity-80 backdrop-blur-md rounded-lg shadow-lg">
                <div className="flex items-center justify-center space-x-4">

                    <div>
                        <div className="text-2xl font-semibold text-blue-950">
                            <p className="italic">&quot;Leading with vision and purpose, we create a future of limitless possibilities.&quot;</p>
                        </div>
                        <div className="mt-6 flex flex-col justify-center items-center text-lg text-gray-800">
                            <img
                                src="https://randomuser.me/api/portraits/men/15.jpg"
                                alt="CEO"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <p className=" text-blue-950">John Doe</p>
                            <p className="font-semibold text-blue-950">CEO, Hao ChapChap</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CEOMessage;