import jquery from 'jquery';

const extractSpeakableSpecification = (html) => {
    let tempDom = jquery('<output>').append(jquery.parseHTML(html));
    return extractSpeakableSpecificationFromDOM(tempDom);
}

const extractSpeakableSpecificationFromDOM = (dom) => {
    let scripts = [];
    jquery(dom).find("script[type='application/ld+json']").each(function (i, elem) {
        try {
            scripts[i] = JSON.parse(jquery(this).html());
        } catch (err) {
            throw new Error("There was an error parsing the JSON in the 'application/ld+json' script tag. " + err);
        }
    });

    if (scripts.length == 0) {
        return null;
    }

    let speakableSpecification = findSpeakableSpecification(scripts);
    return speakableSpecification;
}

const extractSpeakableContent = (html) => {
    let tempDom = jquery('<output>').append(jquery.parseHTML(html));

    let speakables = [];
    let specification = extractSpeakableSpecificationFromDOM(tempDom);

    if (!specification) {
        return null;
    }
    if (specification.cssSelector.length == 0) {
        throw new Error("No valid selectors found in SpeakableSpecification.");
    } else {
        for (let selector of specification.cssSelector) {
            jquery(tempDom).find(selector).each(function (i, element) {
                speakables.push(jquery(this).text().trim());
            });

        }
        return speakables;
    }
}

const extractSpeakables = (html) => {
    let tempDom = jquery('<output>').append(jquery.parseHTML(html));

    let speakables = [];
    let specification = extractSpeakableSpecificationFromDOM(tempDom);

    if (!specification) {
        return { specification: specification, speakables: null,
            content: null,
            validations: [] };
    }
    if (specification.cssSelector.length == 0) {
        throw new Error("No valid selectors found in SpeakableSpecification.");
    } else {
        for (let selector of specification.cssSelector) {
            jquery(tempDom).find(selector).each(function (i, element) {
                speakables.push(jquery(this).text().trim());
            });

        }
        let content = combineSpeakableContent(speakables);
        let validations = validateSpeakableContent(content);
        return {
            specification: specification,
            speakables: speakables,
            content: content,
            validations: validations
        };
    }
}

const findSpeakableSpecification = (jsonlds) => {
    for (let json of jsonlds) {
        if (json instanceof Array) {
            for (let inner of json) {
                let extracted = extractSpeakableSpecificationFromJson(inner);
                if (extracted) {
                    return extracted;
                }
            }
        } else {
            let extracted = extractSpeakableSpecificationFromJson(json);
            if (extracted) {
                return extracted;
            }
        }

    }

    return null;

}

const extractSpeakableSpecificationFromJson = (json) => {
    if (json["speakable"] && json["speakable"]["@type"]) {
        if (json["speakable"]["@type"] == "SpeakableSpecification") {
            return json["speakable"];
        }
    }
    return null;
}

/**
 * Combines an array of speakable items into one block of text. Adds a period to any sections lacking punctuation.
 * @param {array} speakables 
 */
const combineSpeakableContent = (speakables) => {
    if (!speakables) {
        return null;
    }
    return speakables.map(s => ensurePunctuationAtEnd(s)).join(' ');
}

/**
 * Adds a period to the end of a sentence if it is missing punctuation.
 * @param {string} sentence
 */
const ensurePunctuationAtEnd = (sentence) => {
    if (!sentence) {
        return '.';
    } else {
        sentence = sentence.trim();
        if (sentence.match(/^[\w\W\s]+[?.!]$/g)) {
            return sentence;
        } else {
            return `${sentence}.`;
        }
    }
}

/**
 * @param {string} content 
 */
const validateSpeakableContent = (content) => {

    let validations = [];

    if (!content) {
        validations.push({ type: "error", message: "No speakable content found." })
        return validations;
    }

    //check length
    let words = content.match(/\S+/g).length;

    //speakable content should have 20-30 seconds of content
    if (words < 7) {
        validations.push({ type: "error", message: "The speakable content is too short. Aim for 20-30 seconds of spoken content (2-3 sentences)." })
    } else if (words < 20) {
        validations.push({ type: "warning", message: "The speakable may be too short. Aim for 20-30 seconds of spoken content." })
    }

    if (words > 100) {
        validations.push({ type: "error", message: "The speakable content is too long. Aim for 20-30 seconds of spoken content (2-3 sentences)." })
    } else if (words > 80) {
        validations.push({ type: "warning", message: "The speakable may be too long. Aim for 20-30 seconds of spoken content." })
    }

    return validations;
}


export { extractSpeakableSpecification, extractSpeakableContent, extractSpeakables };