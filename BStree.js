function NodeA(k)
{
    this.key = k; 
    this.left = null;
    this.right = null;
    this.parent = null;

    this.isLeaf = function()
    { 
        if (this.left == null && this.right == null)
            return 1;

        return 0;
    };
}

function BSTree()
{
    this.size = 0;
    this.root = new NodeA(null);

    this.PostO = [];
    this.PreO = [];
    this.count = 0;

    this.insert = function(x)
    {
        var t = this.root;
        var p = new NodeA(null);

        while (t != null)
        {
            p = t; 												
            if (t.key == x)
            {
                this.size++;
                return this;
            }

            if(t.key>x) t = t.left; 				
            else t = t.right;
        }

        var y = new NodeA(x);
        if (this.root == null) this.root = y;
        else
        {
            if(p.key > x) p.left = y;
            else p.right = y;
            y.parent = p;
        }
        this.size++;
        return this;		
    }

    this.search = function(x)
    {
        if(this._search(x)) return 1;
        return 0;
    };

    this.rec_search = function(x) { return this._rec_search(x,root) != null ? 1 : 0; };

    this._rec_search = function(x,y)
    {
        if (y == null) return null;
        if (y.key == x ) return y;
        if (y.key > x ) return this._rec_search(x, y.left);
        else return this._rec_search(x, y.right);					
    };

    this._search = function(x)
    {
        var t = this.root;	

        while(t != null)
        {
            if (t.key == x) return t;
            if (t.key > x) t = t.left;
            else t = t.right;
        }
        return null;
    };

    this.getMin = function(x)
    {
        if (x==null) return null;
        while(x.left != null) x = x.left;
        return x;
    };

    this.getMax = function(x)
    {
        if (x==null) return null;
        while(x.right != null) x = x.right;
        return x;
    };

    this.getNext = function(x)
    {
        if (this.getMax(this.root) == x ) return null;
        if (x.right) return this.getMin(x.right);
        while(x.parent.key <= x.key) x = x.parent;
        return x.parent;
    };

    this._inorder = function(x) {
        if(x==null) return;
        this._inorder(x.left);
        document.write(x.key+" ");
        this._inorder(x.right);
    };

    this._postorder = function(x) {
        if(x==null) return;
        this._postorder(x.left);
        this._postorder(x.right);
        if (x.key != null)
        {
            this.PostO[this.count] = x.key;
            this.count++;
        }
    };

    this._preorder = function(x) {
        if(x==null) return;
        if (x.key != null)
        {
            this.PreO[this.count] = x.key;
            this.count++;
        }
        this._preorder(x.left);
        this._preorder(x.right);
    };

    this.del = function(x) {
        this._del(this.root, x);
        return this;
    };

    this.rightRotate = function(x){
        var t =  this._search(x);
        if(t==null) return this;
        var l=t.left;
        var p=t.parent;
        if (l==null) return this;
        var s=l.right;
        if(p != null)
        {
            if(p.key<t.key) p.right = l;
            else p.left = l;
        }
        else this.root = l;

        l.parent = p;
        if(s!=null)
        {
            s.parent = t;
            t.left = s;
        }
        else t.left = null;

        l.right = t;
        t.parent = l;

        return this;
    };

    this.leftRotate = function(x)
    {
        var t =  this._search(x);
        if(t==null) return this;
        var r=t.right;
        var p=t.parent;
        if (r==null) return this;
        var s=r.left;
        if(p!=null){
            if(p.key<t.key) p.right = r;
            else p.left = r;
        }
        else this.root = r;

        r.parent = p;
        if(s!=null)
        {
            s.parent = t;
            t.right = s;
        }
        else t.right = null;
        r.left = t;
        t.parent = r;

        return this;
    };

    this._del = function(r,x)
    {
        var t = this._rec_search(x, r);
        if (t == null) return this;

        if (t.isLeaf())
        {					
            this.size--;
            var p = t.parent; 
            if (p==null) {this.root = null; return this;} 			
            if (p.left == t) p.left = null;
            else p.right = null;
            return this;
        }													
        if( !(t.left && t.right) )
        { 			
            this.size--;											
            var p = t.parent;						
            var f = t.left;							
            if(f==null) f = t.right; 						
            if(p==null) {this.root=f; return this;}				
            if( p.right == t ) p.right = f; 		
            else p.left = f;						 		
            f.parent = p;								
            return this;									
        }

        var n =  this.getNext(t);

        if (n == null) n = new NodeA(null);

        t.key = n.key;
        this._del(t.right, n.key);
        return this;										
    };

    this.inorder = function() {										
        document.write("("+this.size+") ");
        var t = this.getMin(this.root);
        while(t!=null) {
            /*console.log(t.key+" ");*/
            t = this.getNext(t);
        }
        document.write("<br>");
    };

    this.rec_inorder = function() { this._inorder(this.root); };
    this.rec_postorder = function() { this.count = 0; this._postorder(this.root); };
    this.rec_preorder = function() { this.count = 0; this._preorder(this.root); };
}