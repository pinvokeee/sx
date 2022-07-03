class sheetManager
{
    constructor(source)
    {
        this.source = source;
        this.targetSheet = null;

        this.load();
    }

    load()
    {
        const id = 0;
        const sheet_obj = new sheetObject();
        
        this.loadItems(this.source.items, sheet_obj.checkItems, id);

        this.targetSheet = sheet_obj;
    }

    loadItems(sourceItems, destItems, id)
    {
        console.log(sourceItems);
        for (const item of sourceItems)
        {
            const new_item = new checkItem();
            
            new_item.ID = id++;
            new_item.isRequired = item.isRequired != null ? item.isRequired : false;
            new_item.type = item.type != null ? item.type : "label";
            new_item.label = item.label != null ? item.label : "";

            if (item.validation != null) new_item.setValidation(item.validation);

            destItems.push(new_item);

            if (item.items != null) id = this.loadItems(item.items, new_item.items, id);
        }

        return id;
    }

    setState(target, state)
    {
        target.state = state;
    }

    getCanOutputLog()
    {
        return this._getCanOutputLog(this.getItems());
    }

    _getCanOutputLog(items)
    {
       for (const item of items)
       {
            const r = item.isCompleted();
            if (!r.result) return false;
                  
            const b = this._getCanOutputLog(item.items);
            if (!b) return false;
       }

       return true;
    }

    generateCheckLog()
    {
        const log = [];
        this._generateCheckLog(this.getItems(), log, 0);

        return log.join("\n");
    }

    _generateCheckLog(items, log, nest)
    {
        for (const item of items)
        {
            if (item.state.isEnabled)
            {
                if (item.type == "text")
                {
                    log.push(`${"\t".repeat(nest)}${item.label}:${item.state.value}`);
                }
                else if (item.type == "radio")
                {
                    log.push(`${"\t".repeat(nest)}${item.label}:${item.state.value}`);                    
                }
                else if (item.type == "check")
                {
                    log.push(`${"\t".repeat(nest)}${item.label}:`);
                    
                    for (const sel of this.sortFromId(item.state.value, item.items))
                    {
                        log.push(`${"\t".repeat(nest)}☑${sel.label}`);
                        this._generateCheckLog(sel.items, log, nest+1);
                    }
                }
            }

            this._generateCheckLog(item.items, log, nest+1);
        }
    }

    sortFromId(selectedItems, sourceItems)
    {
        const s = selectedItems.map(
            item => sourceItems.find(i => i.label == item)
        ).sort((a, b) => a.ID - b.ID);

        return s;
    }

    getItems()
    {
        return this.targetSheet.checkItems;
    }
}