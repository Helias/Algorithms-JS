// BinaryHeap("max"), BinaryHeap("min")
function BinaryHeap(type)
{
    this.A = [];
    this.heapsize = 0;

    this.left      = function(i) { return i<<1; };
    this.right 	   = function(i) { return (i<<1)|1; };
    this.parent	   = function(i) { return i>>1; };
    this.size      = function() { return this.heapsize; };

    this.swap = function(i,j)
    {
        var tmp = this.A[i];
        this.A[i] = this.A[j];
        this.A[j] = tmp;
    };

    this.heapify = function(i)
    {
        if (i > this.heapsize) return;
        var l = this.left(i);
        var r = this.right(i);
        var max = i;
        if (l <= this.heapsize && this.compare(this.A[max], this.A[l]) < 0) max = l;
        if (r <= this.heapsize && this.compare(this.A[max], this.A[r]) < 0) max = r;
        if (max == i) return;
        this.swap(i, max);
        this.heapify(max);
    };

    this.compare = function(a, b)
    {
        if (type == "min")
            return b-a;
        else
            return a-b;
    };

    this.extractM = function()
    {
        if (this.heapsize == 0) return null;
        this.swap(1, this.heapsize);
        this.heapsize--;
        this.heapify(1);
        return this.A[this.heapsize+1];
    };

    this.insert = function(x)
    {
        this.heapsize += 1;
        this.A[this.heapsize] = x;
        var i = this.heapsize;
    };

    this.builtHeap = function()
    {
        for(var i = parseInt((this.heapsize)/2); i > 0; i--)
            this.heapify(i);
        return this;
    };
}

/*
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var B = new BinaryHeap("min");

for(var c = 0; c < arr.length; c++)
    B.insert(arr[c]);

B.builtHeap();

// with extract Min/Max
B.extractM();

var results = B.A;
results.shift(); // results = [2, 4, 3, 8, 5, 6, 7, 9, 1]
*/
