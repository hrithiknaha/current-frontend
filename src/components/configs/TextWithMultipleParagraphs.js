import React from "react";

const TextWithMultipleParagraphs = ({ text }) => {
    const paragraphs = text.split("\n\n");

    return (
        <div>
            {paragraphs.map((paragraph, index) => (
                <p className="mb-4" key={index}>
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

export default TextWithMultipleParagraphs;
