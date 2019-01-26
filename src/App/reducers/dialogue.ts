export const advanceDialogue = (currInd: number, maxLen: number) => {
    return currInd <= maxLen - 2 ? currInd + 1 : 0;
}