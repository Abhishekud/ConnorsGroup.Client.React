const {expect} = global;

if (expect) {
  expect.extend({
  /**
  * This is an extension method of expect, which asserts if given object is present in input array or not.
  * Note: object can be a partial object. e.g. if
  * array = [{'type': 'Group','id': 26},{'type': 'Group','id': 30}] and
  * object = {'id': 26}
  * then it will return true.
  */
    toContainObjectWithProperty(array, object) {
      const pass = this.equals(array,
        expect.arrayContaining([
          expect.objectContaining(object),
        ])
      );

      if (pass) {
        return {
          message: () => (`expected ${this.utils.printReceived(array)} not to contain object ${this.utils.printExpected(object)}`),
          pass: true,
        };
      }
      return {
        message: () => (`expected ${this.utils.printReceived(array)} to contain object ${this.utils.printExpected(object)}`),
        pass: false,
      };
    },
  });
}

export default expect;
