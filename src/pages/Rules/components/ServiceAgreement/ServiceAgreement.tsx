import './ServiceAgreement.scss';

const ServiceAgreement = () => {
  return (
    <div className='service-agreement'>
      <ol className='custom-ordered-list'>
        <li>
          By registering as a Trader in the PTN you acknowledge that the registration fee is
          non-refundable. If one is not competitive, they will be knocked out of the competition and
          lose the registration fee.
        </li>
        <li>
          Upon registering, TaoTrader will configure a miner virtual machine and submit for and pay
          Tao to the Subnet on your behalf. This registration comes with a Hotkey which will be
          delivered to the TaoTrader user in order to track earnings.
        </li>
        <li>
          All compute fees, miner updates, and developer requirements will be handled by TaoTrader.
          Users will receive support for their Dashboards and trades and can reach TaoTrader via
          Telegram.
        </li>
        <li>
          TaoTrader users will receive access to our Telegram Signal Bot to assist in taking trades
          and overall to be successful in the competition. Users can upgrade to premium Signals and
          other features to improve their performance.
        </li>
        <li>
          Tao is emitted daily and will be paid to the user/traders preferred payment method (TAO,
          USD, or USDT) on a daily basis, Monday through Friday except for banking holidays.
        </li>
        <li>
          Traders will split their profits with TaoTrader in accordance with the following schedule:
        </li>
        <li>
          Fees, Profit Share:
          <ul className='custom-unordered-list'>
            <li>
              80/20 for the first 60 days - For each trader registration, profit split is 80% to
              Trader, and 20% to TaoTrader
            </li>
            <li>90/10 thereafter - After 60 days, TaoTrader will keep 10%</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default ServiceAgreement;
