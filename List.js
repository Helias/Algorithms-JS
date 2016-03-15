function Node(k)
{
    this.key = k;
    this.next = null;
}

function List()
{
    this.len = 0;
    this.head = new Node(null);

    this.insert = function(x)
    {
        var p = new Node(x);

        if(this.head.key == null)
        {
            this.head.key = x;
            this.len++;
        }
        else
        {
            var n = this.head;
            for(var i=0; i < this.len; i++)
            {
                if(n.next == null)
                {
                    n.next = p;
                    this.len++;
                }
                else n = n.next;
            }
        }
        return this;
    };

    this.search = function(x)
    {
        var n = this.head;
        for(var i=0; i < this.len; i++)
        {
            if(x == n.key) return 1;
            else n = n.next;
        }
        return 0;
    };

    this.print = function()
    {
        var n = this.head;
        var tmp = "[]-";
        for (var i = 0; i < this.len; i++)
        {
            tmp += ">"+n.key+"-";
            n = n.next;
        }
        /*console.log(tmp+"//");*/
    };

    this.del = function(x)
    {
        var n = this.head;

        if (!this.search(x)) return this;
        if (this.head.key == x)
        {
            this.head = this.head.next;
            this.len--;
            return this;
        }
        else
        {
            var p = n.next;
            if (p.key == x) n.next = p.next;
            else
            {
                n = p;
                p = p.next;
            }
            this.len--;
            return this;
        }
    };
}
