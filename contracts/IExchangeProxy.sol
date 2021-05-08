//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.4;  

// interface PoolInterface {
//     function swapExactAmountIn(address, uint, address, uint, uint) external returns (uint, uint);
//     function swapExactAmountOut(address, uint, address, uint, uint) external returns (uint, uint);
//     function calcInGivenOut(uint, uint, uint, uint, uint, uint) external pure returns (uint);
//     function calcOutGivenIn(uint, uint, uint, uint, uint, uint) external pure returns (uint);
//     function getDenormalizedWeight(address) external view returns (uint);
//     function getBalance(address) external view returns (uint);
//     function getSwapFee() external view returns (uint);
// }

interface TokenInterface {
    function balanceOf(address) external view returns (uint);
    function allowance(address, address) external view returns (uint);
    function approve(address, uint) external returns (bool);
    function transfer(address, uint) external returns (bool);
    function transferFrom(address, address, uint) external returns (bool);
    function deposit() external payable;
    function withdraw(uint) external;
}

// interface RegistryInterface {
//     function getBestPoolsWithLimit(address, address, uint) external view returns (address[] memory);
// }

interface IExchangeProxy {

  // struct Pool {
  //       address pool;
  //       uint    tokenBalanceIn;
  //       uint    tokenWeightIn;
  //       uint    tokenBalanceOut;
  //       uint    tokenWeightOut;
  //       uint    swapFee;
  //       uint    effectiveLiquidity;
  //   }

    struct Swap {
      address pool;
      address tokenIn;
      address tokenOut;
      uint swapAmount; // tokenInAmount / tokenOutAmount
      uint limitReturnAmount; // minAmountOut / maxAmountIn
      uint maxPrice;
    }

  //   function setRegistry(address _registry) external;

    function batchSwapExactIn(
        Swap[] memory swaps,
        TokenInterface tokenIn,
        TokenInterface tokenOut,
        uint totalAmountIn,
        uint minTotalAmountOut
    )
        external payable
        returns (uint totalAmountOut);

  //   function batchSwapExactOut(
  //       Swap[] memory swaps,
  //       TokenInterface tokenIn,
  //       TokenInterface tokenOut,
  //       uint maxTotalAmountIn
  //   )
  //       external payable
  //       returns (uint totalAmountIn);

  //   function multihopBatchSwapExactIn(
  //       Swap[][] memory swapSequences,
  //       TokenInterface tokenIn,
  //       TokenInterface tokenOut,
  //       uint totalAmountIn,
  //       uint minTotalAmountOut
  //   )
  //       external payable
  //       returns (uint totalAmountOut);

  //   function multihopBatchSwapExactOut(
  //       Swap[][] memory swapSequences,
  //       TokenInterface tokenIn,
  //       TokenInterface tokenOut,
  //       uint maxTotalAmountIn
  //   )
  //       external payable
  //       returns (uint totalAmountIn);

    // function smartSwapExactIn(
    //     TokenInterface tokenIn,
    //     TokenInterface tokenOut,
    //     uint totalAmountIn,
    //     uint minTotalAmountOut,
    //     uint nPools
    // )
    //   external payable
    //   returns (uint totalAmountOut);

  //   function smartSwapExactOut(
  //       TokenInterface tokenIn,
  //       TokenInterface tokenOut,
  //       uint totalAmountOut,
  //       uint maxTotalAmountIn,
  //       uint nPools
  //   )
  //       external payable
  //       returns (uint totalAmountIn);

    function viewSplitExactIn(
        address tokenIn,
        address tokenOut,
        uint swapAmount,
        uint nPools
    )
      external view
      returns (Swap[] memory swaps, uint totalOutput);

    // function viewSplitExactOut(
    //     address tokenIn,
    //     address tokenOut,
    //     uint swapAmount,
    //     uint nPools
    // )
    //     external view
    //     returns (Swap[] memory swaps, uint totalOutput);
}