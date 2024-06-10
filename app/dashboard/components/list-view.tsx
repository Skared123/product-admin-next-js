import { formatPrice } from "@/actions/format-price"
import { Button } from "@/components/ui/button"
import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableFooter,
      TableHead,
      TableHeader,
      TableRow,
} from "@/components/ui/table"
import { Product } from "@/interfaces/product.interface"
import { LayoutList, SquarePen, Trash2 } from "lucide-react"
import Image from "next/image"
import { CreateUpdateItem } from "./create-update-item.form"
import { ConfirmDeletion } from "./confirm-deletion"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

interface ListViewProps {
      items: Product[],
      getItems: () => Promise<void>
      deleteItem: (item: Product) => Promise<void>
      isLoading: boolean
}

const ListView = ({ items, getItems, deleteItem, isLoading }: ListViewProps) => {
      return (
            <div className="md:hidden">
                  {!isLoading && items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-6 border border-solid border-gray-300 rounded-xl p-6">
                              <div className="flex justify-start items-center">
                                    <Image
                                          width={1000}
                                          height={1000}
                                          src={item.image.url}
                                          alt={item.name}
                                          className="object-cover w-16 h-16"
                                    />
                                    <div className="-6">
                                          <h3 className="font-semibold">{item.name}</h3>
                                          <div className="text-sm">
                                                Price: {formatPrice(item.price)} <br />
                                                Sold Units: {formatPrice(item.soldUnits)} <br />
                                                <Badge className="mt-2" variant={"outline"}>Profit: {formatPrice(item.soldUnits * item.price)}</Badge>
                                          </div>
                                    </div>
                              </div>
                              <div className="ml-2">
                                    {/* === uPDATEiTEM === */}
                                    <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                                          <Button className="w-8 h-8 p-0">
                                                <SquarePen className="w-5 h-5" />
                                          </Button>

                                    </CreateUpdateItem>

                                    <div className="mb-2"></div>

                                    {/* === DeLeTeiTEM === */}
                                    <ConfirmDeletion
                                          deleteItem={deleteItem}
                                          item={item}
                                    >
                                          <Button className="w-8 h-8 p-0" variant={"destructive"}>
                                                <Trash2 className="w-5 h-5" />
                                          </Button>
                                    </ConfirmDeletion>
                              </div>

                        </div>
                  ))}
                  {/* ==== LOADING ===== */}
                  {isLoading && [1, 1, 1, 1].map((item, i) => (
                        <div key={i} className="flex justify-between items-center mb-6 border border-solid border-gray-300 rounded-xl p-6">
                              <div className="flex justify-start items-center">
                                    <Skeleton className="w-16 h-16 rounded-xl"></Skeleton>
                                    <div className="-6">
                                          <Skeleton className="w-[150px] h-4"></Skeleton>
                                          <Skeleton className="w-[100px] h-4 mt-2"></Skeleton>
                                    </div>
                              </div>
                        </div>
                  ))}
                  {/* === no items === */}
                  {!isLoading && items.length === 0 &&
                        <div className="text-gray-200 my-20">
                              <div className="flex justify-center ">
                                    <LayoutList className="w-[120px] h-[120px]" />
                              </div>
                              <h2 className="text-center">No items available</h2>
                        </div>
                  }
            </div>
      );
}

export default ListView;