// InsertionCount(array)
function InsertionCount(A)
{
    var count = 0;
    for (var i = 1; i < A.length+1; i++)
        for (var j = i-1; j >= 0; j--)
            if (A[i] < A[j])
                count++;
    return count;
}
/*
var arr = [6, 7, 3, 5, 2, 1, 4, 9];
var count = InsertionCount(arr); // count = 16
*/
