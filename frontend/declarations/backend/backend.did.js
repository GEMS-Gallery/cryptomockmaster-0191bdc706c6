export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'getOrderBook' : IDL.Func(
        [],
        [
          IDL.Record({
            'asks' : IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Float64)),
            'bids' : IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Float64)),
          }),
        ],
        ['query'],
      ),
    'getPriceData' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Float64, IDL.Float64))],
        ['query'],
      ),
    'placeTrade' : IDL.Func([IDL.Bool, IDL.Float64, IDL.Float64], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
