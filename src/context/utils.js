// Mapping messages for display
export const firstOrLastMap = (messages) => {
    let indices = {
        firstIndices: [],
        lastIndices: []
    }

    let last = 0;
    let first = 0;

    for (let i = 0; i < messages.length; i++) {
        if (!messages[i - 1]) {
            indices.firstIndices.push(i);
        }

        if (!messages[i + 1]) {
            indices.lastIndices.push(i);
            return indices
        }

        if (messages[i].author.name === messages[i + 1].author.name) {
            last = i + 1;
        } else {
            last = i;
            first = i + 1;
            indices.lastIndices.push(last);
            indices.firstIndices.push(first)
        }
    }

    return indices
}

export const isFirstOrLast = (index, mapIndex) => {
    return mapIndex.includes(index) ? true : false
}