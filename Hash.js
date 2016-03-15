/* ChainedHash require List.js  */
function ChainedHash(m, type, c)
{
    this.m = m;
    this.A = [];
    this.B = [];

    for (var i = 0; i < this.m; i++)
    {
        this.A[i] = new List;
        this.B[i] = 0;
    }

    this.hash = function(x)
    {
        if (type == "div")
            var k = x % this.m;
        else
            var k = parseInt(((parseFloat(x*c))-(parseInt(x*c))) * this.m);
        return k;
    };

    this.insert = function(x)
    {
        var i = this.hash(x);
        this.A[i].insert(x);
        this.B[i]++;
    };

    this.print = function()
    {
        var tmp = "";
        for(var i = 0; i < m; i++)
            this.A[i].print();
    };
}

function OpenAddressHash(m, type, c1, c2)
{
    this.m = m;
    this.A = [];

    for (var i = 0; i < m; i++)
        this.A[i]=0;

    this.insert = function(x)
    {
        var i = 0;
        while (i < this.m)
        {
            var j = this.hash(x,i);
            if (this.A[j] == 0)
            {
                this.A[j] = x;
                return this;
            }
            else i++;
        }
    };

    this.print = function()
    {
        var tmp = "";
        for (var i = 0; i < this.m; i++)
            tmp += this.A[i]+" ";
        /*console.log(tmp);*/
    };

    this.hash = function(k,i)
    {
        if (type == "linear")
            return (((k % this.m)+i) % this.m);
        else if (type == "square")
            return (((k % this.m)+(c1*i)+(c2*i*i)) % this.m);
        else if (type == "double")
            return ((k%c1)+(i*(k%c2)))%this.m;
    };

}
