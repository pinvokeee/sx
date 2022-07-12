class checkItem
{
    constructor(obj)
    {
        this.ID = -1;
        
        this.label = "タイトル";
        this.type = "label";
        this.items = [];
        this.isRequired = false;

        this.parent = null;
        
        this.validation = 
        {
            pattern: "",
            errorMessage: ""   
        };

        this.state = 
        {
            value: null,
            isChanged: false,
            isEnabled: false,
        }

        this.setValidation(this.validation);
    }

    setValidation(validate_data)
    {
        this.validation = validate_data;
        this.Reg = new RegExp(this.validation.pattern);
    }

    //入力が完了しているかチェックする
    isCompleted()
    {
        // console.log(this);

        //そもそも入力可能状態になっていなければスルーする
        if (!this.state.isEnabled) return { result: true, reason: "Not Enabled"};
        
        //必須項目なら
        if (this.isRequired)
        {
            if (this.type == "text")
            {
                return { result: this.isMatchedPattern(), reason: "Pattern" };
            }
            else
            {
                return  { result: this.state.value != null && this.state.value.length > 0, reason: "Selected" };
            }
        }

        return { result: true, reason: "Success" };
    }

    isMatchedPattern()
    {
        console.log(this.label);

        //そもそもパターンが設定されていなければOK
        if (this.validation.pattern == "") return true;

        //値が入ってなければNG
        if (this.state.value == null || this.state.value.length == 0) return false;

        //パターンと一致するかチェック
        return this.Reg.test(this.state.value);
    }

    hasRequiredError()
    {
        if (!this.isRequired) return false;
        return this.state.value == null || this.state.value.length == 0
    }

    hasPatternError()
    {
        if (this.validation.pattern == "") return false;

        return !this.Reg.test(this.state.value);
    }
    
    getErrorMessage()
    {
        const error_req = this.hasRequiredError();

        if (error_req)
        {
            if (this.type == "text") return `入力は必須です`;
            if (this.type == "radio" || this.type == "check") return `選択は必須です`;
        }
        
        const error_val = this.hasPatternError();
        
        if (error_val) return this.validation.errorMessage;

        return null;
    }

    clone()
    {
        return this.cloneItem();
    }

    cloneItem()
    {
        const newItem = Object.assign(new checkItem(), this);

        newItem.items = [];
        newItem.validation = Object.assign({}, this.validation);

        for (const item of this.items)
        {
            newItem.items.push(item.cloneItem());
        }

        return newItem;
    }

    // cloneItem(item)
    // {
    //     const newItem = Object.assign(new checkItem(), item);

    //     newItem.items = [];
    //     newItem.validation = Object.assign({}, item.validation);

    //     for (const itm of this.items)
    //     {
    //         newItem.items.push(this.cloneItem(itm));
    //     }

    //     return newItem;
    // }
}