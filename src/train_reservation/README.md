# Kata: Train Reservation

Railway operators aren't always known for their use of cutting edge technology,
and in this case they're a little behind the times. The railway people want you
to help them to improve their online booking service. They'd like to be able to
not only sell tickets online, but to decide exactly which seats should be
reserved, at the time of booking.

You're working on the Ticket Office service, and your next task is to
implement the feature for reserving seats on a particular train. The railway
operator has a service-oriented architecture, and both the interface you'll
need to fulfill, and some services you'll need to use are already implemented.

## Business Rules around Reservations

There are various business rules and policies around which seats may be
reserved. For a train overall, no more than 70% of seats may be reserved in
advance, and ideally no individual coach should have no more than 70% reserved
seats either. However, there is another business rule that says you must put
all the seats for one reservation in the same coach. This could make you go
over 70% for some coaches, just make sure to keep to 70% for the whole train.

## The Guiding Test

The Ticket Office service is an API that takes train id and number of seats as
arguments, and returns a dict detailing the reservation that has been made.

A reservation comprises a dict with three fields, the train id, booking
reference, and the ids of the seats that have been reserved. Example:

```json
{
  "train_id": "express_2000",
  "booking_reference": "75bcd15",
  "seats": ["1A", "1B"]
}
```

If it is not possible to find suitable seats to reserve, the service should
instead return an empty list of seats and an empty string for the booking
reference.

The test cases in `test_guiding_test.py` outline the expected interface.

## Booking Reference Service

You can get a unique booking reference using a REST-based service. For test
purposes, you can start a local service using the provided code in the
`booking_reference_service` folder. You can assume the real service will behave
the same way, but be available on a different URL.

Start the server by running:

```sh
python booking_reference_service.py
```

You can use this service to get a unique booking reference. Make a `GET`
request to:

```
http://localhost:8082/booking_reference
```

This will return a string that looks a bit like this:

```
75bcd15
```

## Train Data Service

You can get information about which each train has by using the train data
service. For test purposes, you can start a local service using the provided
code in the `train_data_service` folder. You can assume the real service will
behave the same way, but be available on a different URL.

You can start the server by running:

```sh
python start_service.py
```

You can use this service to get data for example about the train with id
`express_2000` like this (`GET` request):

```
http://localhost:8081/data_for_train/express_2000
```

this will return a JSON document with information about the seats that this
train has. The document you get back will look for example like this:

```json
{
  "seats": {
    "1A": { "booking_reference": "", "seat_number": "1", "coach": "A" },
    "2A": { "booking_reference": "", "seat_number": "2", "coach": "A" }
  }
}
```

Note I've left out all the extraneous details about where the train is going to
and from, at what time, whether there's a buffet car etc. All that's there is
which seats the train has, and if they are already booked. A seat is available
if the `booking_reference` field contains an empty string. To reserve seats on
a train, you'll need to make a `POST` request to this URL:

```
http://localhost:8081/reserve
```

and attach form data for which seats to reserve. There should be three fields:

```
"train_id", "seats", "booking_reference"
```

The `seats` field should be a JSON encoded list of seat ids, for example:

```json
["1A", "2A"]
```

The other two fields are ordinary strings. Note the server will prevent you
from booking a seat that is already reserved with another booking reference.

The service has one additional method, that will remove all reservations on a
particular train. Use it with care:

```
http://localhost:8081/reset/express_2000
```
