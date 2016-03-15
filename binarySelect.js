// binarySelect(array, param1, param2)
function binarySelect(A, a, b)
{
    if (a == b) return A[a];

    var c = parseInt((a+b)/2);
    var S1 = 0, S2 = 0;

    for (var i = a; i <= c; i++) S1 += A[i];
    for (var i = c+1; i <= b; i++) S2 +=A[i];

    if(S1 > S2)
        return binarySelect(A, a, c);
    else
        return binarySelect(A, c+1, b);
}
/*
var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var newVal = binarySelect(arr, 3, 6); //newVal = 7;
*/
