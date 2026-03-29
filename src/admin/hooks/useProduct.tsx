import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByIdAction } from "../actions/get-products-by-id.action";
import type { Product } from "@/interfaces/product.interface";
import { createUpdateProdutAction } from "../actions/create-update-product.action";

export const useProduct = (id: string) => {
  
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProductsByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const mutation = useMutation({
    mutationFn: createUpdateProdutAction,
    onSuccess: (product: Product) => {

      //invalidar cache 
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", { id : product.id }] });

      // actualizar queryData
      queryClient.setQueryData(["product", { id: product.id }], product);
    },
  });


  return { ...query, mutation };
};
