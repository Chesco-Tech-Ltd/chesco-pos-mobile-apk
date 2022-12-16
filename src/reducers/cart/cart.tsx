let itemsList: any[] = [];
var newArry: never[] = [];

var isProductLoaded = false;
var initalPrice = 2;

function getUnique(arr: any[], comp: string) {
  //   const filtered = arr.filter((v, i) => arr.indexOf(v) !== i);
  //   console.log(filtered);
  //   if(filtered.length!)

  const unique = arr
    .map((e: { [x: string]: any }) => e[comp])
    // store the keys of the unique objects
    .map((e: any, i: any, final: string | any[]) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter((e: string | number) => arr[e])
    .map((e: string | number) => arr[e]);

  return unique;
}

function CountTotal(type: string, params: any[]) {
  var total = 0;
  var rtxtotal = 0;
  // console.log(params);
  if (type === "rtx") {
    params.forEach(function (
      item: {
        amountInstore: number;
        isTaxEnabled: any;
        qnt: number;
        initalPrice: number;
      },
      index: any
    ) {
      if (item.amountInstore !== 0)
        if (item.isTaxEnabled) {
          rtxtotal = item.qnt * item.initalPrice;
        }
    });
  } else {
    params.forEach(function (
      item: { amountInstore: number; qnt: number; initalPrice: number },
      index: any
    ) {
      if (item.amountInstore !== 0) total = item.qnt * item.initalPrice;
    });
  }

  return { total, rtxtotal };
}

function AddQu(
  params: {
    items: any[];
    productKey: any;
    input: string;
    payload: { items: { productKey: any } };
  },
  type: string
) {
  if (params.items) {
    if (type === "input")
      params.items.map(
        (items: {
          amountInstore: number;
          productKey: any;
          initalPrice: string;
          sallingprice: string | number;
          qnt: number;
        }) => {
          if (items.amountInstore !== 0)
            if (items.productKey === params.productKey) {
              if (params.input !== "") {
                var num = parseInt(params.input);

                initalPrice = parseFloat(items.initalPrice);
                items.sallingprice =
                  parseFloat(items.sallingprice) + initalPrice;
                items.qnt = num;
                items.amountInstore = items.amountInstore - num;
                newArry = params.items;
              }
              // console.log(params);
            }
        }
      );
    else
      params.items.map(
        (items: {
          amountInstore: number;
          productKey: any;
          initalPrice: string;
          sallingprice: string | number;
          qnt: string | number;
        }) => {
          if (items.amountInstore !== 0)
            if (items.productKey === params.productKey) {
              initalPrice = parseFloat(items.initalPrice);
              items.sallingprice = parseFloat(items.sallingprice) + initalPrice;
              items.qnt = parseInt(items.qnt) + 1;
              items.amountInstore = items.amountInstore - 1;
              newArry = params.items;
            }
        }
      );
  } else {
    itemsList.map((items) => {
      if (items.amountInstore !== 0)
        if (items.productKey === params.payload.items.productKey) {
          initalPrice = parseFloat(items.initalPrice);
          items.sallingprice = parseFloat(items.sallingprice) + initalPrice;
          items.qnt = parseInt(items.qnt) + 1;
          items.amountInstore = items.amountInstore - 1;
          newArry = params.items;
        }
    });
  }
}

function remove(arr: any[], item: any) {
  const index = arr.findIndex(
    (x: { productKey: any }) => x.productKey === item
  );
  arr.splice(index, 1);
  newArry = arr;
}

function RemoveQu(params: { items: any[]; productKey: any }) {
  params.items.map(
    (items: {
      productKey: any;
      initalPrice: string;
      sallingprice: string | number;
      amountInstore: number;
      qnt: string | number;
    }) => {
      if (items.productKey === params.productKey) {
        initalPrice = parseFloat(items.initalPrice);

        if (parseFloat(items.sallingprice) === initalPrice) {
          newArry = params.items;
        } else {
          items.sallingprice = parseFloat(items.sallingprice) - initalPrice;
          items.amountInstore = items.amountInstore + 1;
          items.qnt = parseInt(items.qnt) - 1;
          newArry = params.items;
        }
      }
    }
  );
}

function Qnyquantity(params: {
  payload: { items: { amountInstore: number; isAddedToCart: boolean } };
}) {
  if (params.payload.items.amountInstore !== 0) {
    if (!params.payload.items.isAddedToCart) {
      params.payload.items.amountInstore =
        params.payload.items.amountInstore - 1;
      params.payload.items.isAddedToCart = true;
    }
    itemsList.push(params.payload.items);
    itemsList = getUnique(itemsList, "productKey");
  }
}

function TotaQtCalc(list: any[]) {
  let total_num = 0;

  list.map((itemsMap: { amountInstore: number; qnt: number }) => {
    if (itemsMap.amountInstore !== 0) total_num = total_num + itemsMap.qnt;
  });
  // console.log(total_num);

  return total_num;
}

function CaculateTotalQty(data: {
  items: any[];
  productKey: any;
  qty: number;
}) {
  let total_num = 0;
  let itemsList: any[] = [];
  let total = 0;

  data.items.map(
    (items: { productKey: any; qnt: number; initalPrice: number }) => {
      if (items.productKey === data.productKey) {
        total_num = data.qty;
        items.qnt = total_num;
        total = total_num * items.initalPrice;
      }
      itemsList.push(items);
    }
  );

  return { list: itemsList, num: total_num, total };
}

const Cart = (
  state = {
    isItemInCart: false,
    total: 0,
    workP_total: 0,
    items: [],
    istaxed: false,
    refreshCart: false,
    totalQt: 0,
  },
  action: {
    type: any;
    payload: {
      items: { isTaxEnabled: any };
      isItemInCart: any;
      total: any;
      workP_total: any;
    };
    items: any;
    productKey: any;
  }
) => {
  switch (action.type) {
    case "ADDTOCART":
      AddQu(action, "");
      Qnyquantity(action);

      state = {
        ...state,
        isItemInCart: true,
        refreshCart: false,
        total: CountTotal("cash", itemsList).total,
        workP_total: CountTotal("rtx", itemsList).rtxtotal,
        items: itemsList,
        istaxed: action.payload.items.isTaxEnabled,
        totalQt: TotaQtCalc(itemsList),
      };
      break;
    case "inputAdd":
      // console.log(action);
      AddQu(action, "input");
      state = {
        ...state,
        isItemInCart: true,
        refreshCart: false,
        total: CountTotal("cash", newArry).total,
        workP_total: CountTotal("rtx", newArry).rtxtotal,
        istaxed: true,
        items: newArry,
        totalQt: TotaQtCalc(newArry),
      };

      break;
    case "REMOVEFROMCART":
      itemsList = [];
      newArry = [];

      state = {
        ...state,
        isItemInCart: action.payload.isItemInCart,
        total: action.payload.total,
        workP_total: action.payload.workP_total,
        items: action.payload.items,
        istaxed: true,
        refreshCart: true,
        totalQt: 0,
      };
      break;
    case "ADDQU":
      AddQu(action, "");

      state = {
        ...state,
        isItemInCart: true,
        refreshCart: false,
        total: CountTotal("cash", newArry).total,
        workP_total: CountTotal("rtx", newArry).rtxtotal,
        istaxed: true,
        items: newArry,
        totalQt: TotaQtCalc(newArry),
      };
      break;
    case "REMOVEQU":
      RemoveQu(action);

      state = {
        ...state,
        isItemInCart: true,
        refreshCart: false,
        total: CountTotal("cash", newArry).total,
        workP_total: CountTotal("rtx", newArry).rtxtotal,
        istaxed: true,
        items: newArry,
        totalQt: TotaQtCalc(newArry),
      };
      break;
    case "mnqty":
      // console.log(CaculateTotalQty(action).list);
      // console.log(CaculateTotalQty(action).num);

      state = {
        ...state,
        isItemInCart: true,
        refreshCart: false,
        total: CaculateTotalQty(action).total,
        workP_total: CaculateTotalQty(action).total,
        istaxed: true,
        items: CaculateTotalQty(action).list,
        totalQt: CaculateTotalQty(action).num,
      };

      break;

    case "DELETEQU":
      remove(action.items, action.productKey);

      state = {
        ...state,
        isItemInCart: true,
        refreshCart: true,
        total: CountTotal("cash", newArry).total,
        workP_total: CountTotal("rtx", newArry).rtxtotal,
        istaxed: true,
        items: newArry,
        totalQt: TotaQtCalc(newArry),
      };
      break;

    case "RESTATECART":
      itemsList = [];
      newArry = [];

      // AddQu(action, "reset");

      state = {
        ...state,
        isItemInCart: false,
        refreshCart: true,
        total: 0,
        workP_total: 0,
        items: [],
        istaxed: true,
        totalQt: 0,
      };
      break;
    default:
      return state;
  }

  return state;
};

export default Cart;
