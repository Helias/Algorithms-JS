// swap(array, index1, index2)
function swap(A, i, j)
{
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}

// binaryChange(array, index1, index2)
function binaryChange(A, a, b)
{
    if (a == b) return;

    var c = parseInt((a+b)/2);
    swap(A, a, c);
    swap(A, c+1, b);
    binaryChange(A, a, c);
    binaryChange(A, c+1, b);
    return A;
}
/*
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var newArr = binaryChange(arr, 3, 6); //newArr = [1, 2, 3, 5, 4, 7, 6, 8];
*/
