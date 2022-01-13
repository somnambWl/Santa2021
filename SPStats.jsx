import React from "react";

const StatsRow = ({arr}) => {

    return (
        <tr>
            {arr.map(value => (
                <td>{value}</td>
            ))}
        </tr>
    )
}

const SPStats = ({superpermutations}) => {

    function computeSuperpemutationStats(arr) {
        let numberOfPermutations = arr.length;
        let superpermutation = combineAndReduceArray(arr)
        let superpermutationLength = 0
        if (superpermutation != null) {
            superpermutationLength = superpermutation.length
        }
        return [numberOfPermutations, superpermutationLength]
    }

    function combineAndReduceArray(arr) {
        let superpermutation = arr[0];
        for (let i = 1; i < arr.length; i++) {
            let permutation = arr[i];
            superpermutation = combineAndReduce(superpermutation, permutation)
        }
        return superpermutation
    }

    function combineAndReduce(original, added) {
        let length = Math.min(added.length, original.length);
        let position = 0;
        let index = original.slice(-length).indexOf(added[0], position)
        while (index != -1) {
            let possibleOverlap = length - (position + 1)
            if (added.slice(0, possibleOverlap) === original.slice(-possibleOverlap)) {
                return original.slice(0, (position+1)-length) + added
            }
            position = position + 1;
            index = original.slice(-length).indexOf(added[0], position)
        }
        return original + added
    }

    return (
        <table>
            <tr>
                <th>Permutation</th>
                <th>Length</th>
            </tr>
            {superpermutations.map(superpermutation => (
                    <StatsRow
                    arr={computeSuperpemutationStats(superpermutation)}
                    />
                )
            )}
        </table>
    )
}

export default SPStats