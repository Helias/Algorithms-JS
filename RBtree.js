function nodeBR()
{
    this.key;
    this.parent;
    this.color;
    this.left;
    this.right;

    this.isLeaf = function()
    { 
        if (this.left == null && this.right == null)
            return 1;

        return 0;
    };
}

function RBtree()
{
    this.root = null;
    this.q = null;

    this.print = "";
    this.printKey = "";

    this.countRight = 0;
    this.countLeft = 0;
    this.countFixup = 0;

    this.countLife = 0;

    this.insert = function(z)
    {
        var i = 0;
        var p = new nodeBR, q = new nodeBR, t = new nodeBR;

        t.key = z;
        t.left = null;
        t.right = null;
        t.color = 'r';
        p = this.root;
        q = null;
        if (this.root==null)
        {
            this.root = t;
            t.parent=null;
        }
        else
        {
            while(p != null)
            {
                q = p;
                if(p.key <= t.key)
                    p = p.right;
                else
                    p = p.left;
            }
            t.parent = q;
            if(q.key <= t.key)
                q.right = t;
            else
                q.left = t;
        }
        this.insertfix(t);
    };

    this.insertfix = function(z)
    {
        this.countFixup++;
        if (z == this.root)
        {
            z.color='b';
            return;
        }

        if (z.parent != null && z.parent.color== 'r')
        {
            var padre = z.parent
            var nonno = padre.parent;
            var zio = nonno.right;
            if (padre == nonno.right) zio =nonno.left;
            if (zio!=null && zio.color == 'r')
            {
                //caso 1
                zio.color='b';
                padre.color='b';
                nonno.color='r';
                this.insertfix(nonno);
                return;
            }
            if(padre == nonno.left)
            {
                if(z ==padre.right) {
                    // caso 3
                    this.leftrotate(padre);
                    padre = z;
                    z = padre.left;
                }
                // caso 2
                padre.color='b';
                nonno.color='r';
                this.rightrotate(nonno);
                return;
            }

            else //casi simmetrici ai precedenti
            {
                if (z == padre.left)
                {
                    //caso 3
                    this.rightrotate(padre);
                    padre = z;
                    z = padre.right;
                }
                // caso 2
                padre.color='b';
                nonno.color='r';
                this.leftrotate(nonno);
                return;
            }
        }

    };

    this.rightrotate = function(t)
    {
        this.countRight++;
        if(t==null) return;
        var l = t.left;
        var p=t.parent;
        if (l==null) return;

        var s=l.right;
        if(p!=null)
        {
            if(p.key < t.key) p.right=l;
            else p.left=l;
        }
        else
            this.root = l;

        l.parent = p;
        if(s!=null)
        {
            s.parent=t;
            t.left=s;
            //l.setRight(null);
        }
        else t.left=null;
        l.right = t;
        t.parent = l;
        return;
    };

    this.leftrotate = function(t)
    {
        this.countLeft++;
        if(t==null) return;
        var l = t.right;
        var p=t.parent;
        if (l==null) return;

        var s=l.left;
        if(p!=null)
        {
            if(p.key < t.key) p.right=l;
            else p.left=l;
        }
        else
            this.root = l;

        l.parent = p;
        if(s!=null)
        {
            s.parent=t;
            t.right=s;
            //l.setRight(null);
        }
        else t.right=null;
        l.left=t;
        t.parent=l;
        return;
    };

    this.del = function() {};
    this.successor = function(nod) {};
    this.delfix = function(nod) {};
    this.disp = function() {};
    this.display = function(nod) {};
    this.search = function(x)
    {
        if(this.root==null)
            return;

        var p = this.root;
        var found = 0;

        while(p!=null && found==0)
        {
            if (p.key==x)
                found=1;
            if (found == 0)
            {
                if(p.key<x)
                    p=p.right;
                else
                    p=p.left;
            }
        }

        if(found != 0)
            return p;
    };

    this._preorder = function(p)
    {
        if (p==null) return;
        this.print += p.key+" ";
        this._preorder(p.left);
        this._preorder(p.right);
    };

    this.preorder = function()
    {
        this.print = "";
        this._preorder(this.root);
        /* console.log(this.print); */
    };

    this._colpreorder = function(p)
    {
        if (p==null) return;
        this.print += p.color.toUpperCase()+" ";
        this.printKey += p.key+" ";
        this._colpreorder(p.left);
        this._colpreorder(p.right);
    };

    this.colpreorder = function()
    {
        this.print = "";
        this._colpreorder(this.root);
        /* console.log(this.print); */
    };

    this._postorder = function(p)
    {
        if (p==null) return;
        this._postorder(p.left);
        this._postorder(p.right);
        this.print += p.key+" ";
    };

    this.postorder = function()
    {
        this.print = "";
        this._postorder(this.root);
        /* console.log(this.print); */
    };

    this._colpostorder = function(p)
    {
        if (p==null) return;
        this._colpostorder(p.left);
        this._colpostorder(p.right);
        this.print += p.color.toUpperCase()+" ";
        this.printKey += p.key+" ";
    };

    this.colpostorder = function()
    {
        this.print = "";
        this._colpostorder(this.root);
        /* console.log(this.print); */
    };

    this.count_life = function(p)
    {
        if (p == null) return;
        if (p.isLeaf())
            this.countLife++;
        this.count_life(p.left);
        this.count_life(p.right);
    };

    this.count_life_rec = function()
    {
        this.count_life(this.root);
    }

    this.res = function(k) { return k == "key" ? this.printKey : this.print; };

    this.getRight = function() { return this.countRight; }
    this.getLeft = function() { return this.countLeft; }
    this.getFixup = function() { return this.countFixup; }
    this.getLife = function() { return this.countLife; }
}
