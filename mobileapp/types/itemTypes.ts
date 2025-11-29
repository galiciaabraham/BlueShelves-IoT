
export type Item = 
    {
     "item_id" : number,
    "item_name": string,
    "item_color": string,
    "item_size": string,
    "item_quantity": number,
    "item_sku": string,
    "updated_at": Date,
};

export type ItemForm =
{
    "item_name": string,
    "item_color": string,
    "item_size": string,
    "item_quantity": string,
    "item_sku": string,
};