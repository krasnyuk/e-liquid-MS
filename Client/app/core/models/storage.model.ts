import {ProductModel} from "./product.model";
export interface ProductsStorageDetails {
    id: number;
    count: number;
    productId: number;
    product: ProductModel;
//     public int Id { get; set; }
// [Required]
// public int Count { get; set; }
//
// public int ProductId { get; set; }
// public int StorageId { get; set; }
}

export interface ProductsStorageModel {
    id: number;
    date: string;
    totalCount: number;
    storageDetails: Array<ProductsStorageDetails>;
//     public int Id { get; set; }
// [Required]
//     [DataType(DataType.DateTime)]
// public DateTime Date { get; set; }
// [Required]
// public int TotalCount { get; set; }
}