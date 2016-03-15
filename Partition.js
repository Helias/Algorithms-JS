// swap(array, index1, index2)
function swap(A, i, j)
{
    var tmp = A[i];
    A[i] = A[j];
    A[j] = tmp;
}

// Partition(array, start, array.length-1)
function Partition(A, p, r)
{
    var x = A[r];
    var i = p-1;
    var j = r+1;
    var condition = true;
    while(condition)
    {
        do{ j--; } while(A[j] > x);
        do{ i++; } while(A[i] < x);

        if (i < j) swap(A, i, j);
        else condition = false;
    }
    return A;
}
